"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Phone, Mail } from "lucide-react";

type Libraries = ("places" | "drawing" | "geometry" | "visualization")[];

export interface AddressContactValue {
  address: string;
  location: { type: "Point"; coordinates: [number, number] }; // [lng, lat]
  contactInfo: { phone: string; email: string };
}

interface AddressContactPickerProps {
  /** Google Maps JS API key */
  apiKey: string;
  /** Controlled value */
  value: AddressContactValue;
  /** Controlled updater */
  onChange: (next: AddressContactValue) => void;
  /** Optional: initial map center if value has no coords yet */
  defaultCenter?: google.maps.LatLngLiteral;
  /** Optional: map height (default 400px) */
  mapHeight?: number | string;
  /** Optional: className wrapper */
  className?: string;
  /** Show phone/email inputs (default true) */
  showContactFields?: boolean;
  /** Disable inputs/map */
  disabled?: boolean;
}

const defaultLibraries: Libraries = ["places"];

const containerStyle = (h: number | string) => ({
  width: "100%",
  height: typeof h === "number" ? `${h}px` : h,
});

export default function AddressContactPicker({
  apiKey,
  value,
  onChange,
  defaultCenter = { lat: 20.5937, lng: 78.9629 }, // India fallback
  mapHeight = 400,
  className,
  showContactFields = true,
  disabled = false,
}: AddressContactPickerProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: defaultLibraries,
  });
  const [searchQuery, setSearchQuery] = useState<string>(value.address ?? "");
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(() => {
    const [lng, lat] = value.location?.coordinates ?? [0, 0];
    return lat !== 0 || lng !== 0 ? { lat, lng } : defaultCenter;
  });
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(() => {
      const [lng, lat] = value.location?.coordinates ?? [0, 0];
      return lat !== 0 || lng !== 0 ? { lat, lng } : null;
    });
  const [isSearching, setIsSearching] = useState(false);
  const [addressError, setAddressError] = useState<string>("");

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // keep input synced with external value.address when parent changes it
  useEffect(() => {
    setSearchQuery(value.address ?? "");
  }, [value.address]);

  const updateValue = (patch: Partial<AddressContactValue>) => {
    onChange({
      address: value.address,
      location: value.location,
      contactInfo: value.contactInfo,
      ...patch,
    });
  };

  const setCoords = (lat: number, lng: number) => {
    updateValue({
      location: { type: "Point", coordinates: [lng, lat] },
    });
  };

  const centerMap = (lat: number, lng: number, zoom = 15) => {
    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
      mapRef.current.setZoom(zoom);
    }
  };

  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const addr = results[0].formatted_address ?? "";
        updateValue({ address: addr });
        setSearchQuery(addr);
        setAddressError("");
      } else {
        setAddressError("Could not find address for this location.");
      }
    });
  };

  const searchAddress = useCallback(
    (query: string) => {
      if (!isLoaded || !query.trim()) return;
      setIsSearching(true);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: query }, (results, status) => {
        setIsSearching(false);
        if (status === "OK" && results && results[0]) {
          const { lat, lng } = results[0].geometry.location.toJSON();
          centerMap(lat, lng);
          setCoords(lat, lng);
          updateValue({ address: results[0].formatted_address ?? query });
          setAddressError("");
        } else {
          setAddressError("Location not found. Try a different search.");
        }
      });
    },
    [isLoaded]
  );

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateValue({ address: val });

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => searchAddress(val), 1000);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry || !place.geometry.location) {
      setAddressError(
        `No details available for: "${place?.name ?? "this place"}"`
      );
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    centerMap(lat, lng);
    setCoords(lat, lng);
    const addr = place.formatted_address ?? value.address;
    updateValue({ address: addr });
    setSearchQuery(addr);
    setAddressError("");
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    // If no marker yet, try geolocation once
    const [lng, lat] = value.location?.coordinates ?? [0, 0];
    if (lat === 0 && lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          centerMap(coords.latitude, coords.longitude, 14);
          setCoords(coords.latitude, coords.longitude);
          reverseGeocode(coords.latitude, coords.longitude);
        },
        () => {
          // keep default center
        }
      );
    }
  };

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      setCoords(lat, lng);
      reverseGeocode(lat, lng);
    },
    [] // uses helpers that don't change
  );

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setCoords(lat, lng);
    reverseGeocode(lat, lng);
  };

  return (
    <div className={className}>
      {/* Address input with Autocomplete */}
      <div className="space-y-2">
        <Label
          htmlFor="acp-address"
          className="text-slate-700 font-medium flex items-center gap-2"
        >
          <MapPin className="w-4 h-4 text-emerald-600" />
          Address
        </Label>

        {isLoaded ? (
          <div className="relative">
            <Autocomplete
              onLoad={(a) => (autocompleteRef.current = a)}
              onPlaceChanged={onPlaceChanged}
            >
              <Input
                id="acp-address"
                value={searchQuery}
                onChange={handleAddressInputChange}
                placeholder="Search or type full address"
                disabled={disabled}
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </Autocomplete>
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              </div>
            )}
          </div>
        ) : (
          <Input
            id="acp-address"
            value={searchQuery}
            onChange={() => {}}
            placeholder="Loading Google Maps…"
            disabled
          />
        )}

        {addressError && (
          <p className="text-sm text-rose-500">{addressError}</p>
        )}
      </div>

      {/* Map */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden border mt-4">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle(mapHeight)}
            center={mapCenter}
            zoom={markerPosition ? 15 : 5}
            onLoad={onMapLoad}
            onClick={onMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {markerPosition && (
              <MarkerF
                position={markerPosition}
                draggable={!disabled}
                onDragEnd={onMarkerDragEnd}
                animation={google.maps.Animation.DROP}
              />
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        )}
      </div>

      {/* Contact fields */}
      {showContactFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label
              htmlFor="acp-phone"
              className="text-slate-700 font-medium flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-600" />
              Phone Number
            </Label>
            <Input
              id="acp-phone"
              type="tel"
              value={value.contactInfo.phone}
              onChange={(e) =>
                updateValue({
                  contactInfo: { ...value.contactInfo, phone: e.target.value },
                })
              }
              placeholder="+1 (555) 123-4567"
              disabled={disabled}
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="acp-email"
              className="text-slate-700 font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-600" />
              Email Address
            </Label>
            <Input
              id="acp-email"
              type="email"
              value={value.contactInfo.email}
              onChange={(e) =>
                updateValue({
                  contactInfo: { ...value.contactInfo, email: e.target.value },
                })
              }
              placeholder="contact@yourhotel.com"
              disabled={disabled}
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
