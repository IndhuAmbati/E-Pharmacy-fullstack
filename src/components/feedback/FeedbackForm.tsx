
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

export const FeedbackForm = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Your rating helps us improve our service.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input.",
      });
      
      // Reset form
      setRating(0);
      setFeedback("");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How was your experience?</CardTitle>
        <CardDescription>
          Your feedback helps us improve our service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className="bg-transparent border-none p-0 cursor-pointer focus:outline-none"
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        ratingValue <= (hover || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-sm mt-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="feedback" className="block text-sm font-medium">
              Tell us more about your experience
            </label>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              className="min-h-[120px]"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
