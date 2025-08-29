'use client';
import { useState, useCallback } from 'react';
import { getStreamingResponse } from '@/app/actions';

type UseCompletionOptions = {
    onFinish?: (prompt: string, completion: string) => void;
    onError?: (error: Error) => void;
};

type RequestOptions = {
    body?: Record<string, any>;
};

export function useCompletion(options: UseCompletionOptions = {}) {
    const [completion, setCompletion] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }, []);

    const handleSubmit = useCallback(async (prompt: string, requestOptions?: RequestOptions) => {
        setIsLoading(true);
        setError(undefined);
        setCompletion('');

        try {
            const body = requestOptions?.body || {};
            const stream = await getStreamingResponse(prompt, body.language, body.imageUrl);
            
            let fullCompletion = '';
            for await (const chunk of stream) {
                fullCompletion += chunk;
                setCompletion(fullCompletion);
            }

            if (options.onFinish) {
                options.onFinish(prompt, fullCompletion);
            }

        } catch (err: any) {
            setError(err);
            if (options.onError) {
                options.onError(err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [options]);

    const stop = useCallback(() => {
        // This is a placeholder. In a real scenario with AbortController,
        // you would abort the fetch request here.
        setIsLoading(false);
    }, []);

    return {
        completion,
        input,
        isLoading,
        error,
        handleInputChange,
        setInput,
        handleSubmit,
        stop,
    };
}
