import { useMutation, useQuery } from "@tanstack/react-query";
import { addToWishlist, removeFromWishlist, getWishlist } from "../services/wishlistapiCall";

export function useWishlist() {
  const {
    data: wishlist = { products: [] },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => refetch(),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => refetch(),
  });

  return {
    wishlist,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    loading: isLoading,
    refetch,
  };
}
