import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/lib/const";

export async function fetchTopPlatformReviews() {
  const res = await fetch(`${API_URL}/platform-reviews/top`);
  if (!res.ok) throw new Error("Failed to fetch platform reviews");
  const data = await res.json();
  return data.data;
}

export async function postPlatformReview(review: {
  user?: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
}) {
  const res = await fetch(`${API_URL}/platform-reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Failed to post review");
  const data = await res.json();
  return data.data;
}

export async function updatePlatformReview(id: string, review: {
  name?: string;
  avatar?: string;
  rating?: number;
  comment?: string;
}) {
  const res = await fetch(`${API_URL}/platform-reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Failed to update review");
  const data = await res.json();
  return data.data;
}


interface PlatformReview {
  _id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
}

function Reviews() {
  const [reviews, setReviews] = useState<PlatformReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopPlatformReviews()
      .then(setReviews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">Real reviews from real customers</p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={review._id} className="bg-white border-0 shadow-2xl hover:shadow-blue-200 transition-shadow duration-300 rounded-2xl">
                <CardContent className="p-8 flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-4 shadow-lg ring-2 ring-blue-200">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{review.name}</h4>
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-center mb-2">“{review.comment}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Reviews;