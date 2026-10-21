import { useState, useEffect, useCallback } from "react";

export function useRecommendations(userId) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recommendations on mount
  useEffect(() => {
    if (!userId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/recommendations?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error("[useRecommendations]", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  // Accept a recommendation
  const accept = useCallback(
    async (recommendationId) => {
      // Optimistic update
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== recommendationId)
      );

      try {
        const response = await fetch(
          `/api/recommendations/${recommendationId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "accepted" }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to accept recommendation");
        }

        console.log(`[useRecommendations] Accepted ${recommendationId}`);
      } catch (err) {
        console.error("[useRecommendations] Accept error:", err);
        // Revert optimistic update on error
        // (In a real app, you might refetch recommendations)
      }
    },
    []
  );

  // Dismiss a recommendation
  const dismiss = useCallback(
    async (recommendationId) => {
      // Optimistic update
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== recommendationId)
      );

      try {
        const response = await fetch(
          `/api/recommendations/${recommendationId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "dismissed" }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to dismiss recommendation");
        }

        console.log(`[useRecommendations] Dismissed ${recommendationId}`);
      } catch (err) {
        console.error("[useRecommendations] Dismiss error:", err);
      }
    },
    []
  );

  return {
    recommendations,
    loading,
    error,
    accept,
    dismiss,
  };
}
