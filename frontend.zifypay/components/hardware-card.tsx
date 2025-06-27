import Image from "next/image";

interface HardwareFeature {
  icon: string;
  text: string;
}

interface HardwareCardProps {
  title: string;
  price: string;
  image: string;
  alt: string;
  features: HardwareFeature[];
}

export function HardwareCard({
  title,
  price,
  image,
  alt,
  features,
}: HardwareCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <span className="text-2xl font-bold">{price}</span>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={alt}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold text-center mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-gray-100 rounded"></div>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
