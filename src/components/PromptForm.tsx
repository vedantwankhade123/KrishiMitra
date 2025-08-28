'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(20, "Please provide a more detailed description."),
});

const defaultValue = `My farm has soil with a pH of 6.5 and medium moisture, rich in phosphorus. The weather forecast predicts an average temperature of 25°C with 300mm of rain. I've previously grown corn and soybeans. Corn prices are high, while soybeans are stable. I'm looking for high-yield, profitable crops.`;

type PromptFormProps = {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
};

export function PromptForm({
  onSubmit,
  disabled,
}: PromptFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: defaultValue,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data.prompt);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
           <CardHeader>
            <CardTitle>Describe Your Farm & Goals</CardTitle>
            <CardDescription>
              Provide details about your farm's conditions and what you want to achieve. The more detail you provide, the better the recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Describe soil, weather, crop history, and goals like 'maximize profit' or 'improve soil health'..."
                      className="resize-none min-h-[250px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={disabled}>
              {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {disabled ? 'Analyzing...' : 'Get Recommendations'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
