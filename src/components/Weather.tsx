'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Thermometer, Wind, Droplets, Sun, Cloud, CloudRain, CloudSnow, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type WeatherData = {
    temperature: number;
    windspeed: number;
    precipitation_probability: number;
    weathercode: number;
}

type Location = {
    latitude: number;
    longitude: number;
}

function getWeatherIcon(code: number) {
    if (code === 0) return <Sun className="h-5 w-5 text-yellow-400" />;
    if (code >= 1 && code <= 3) return <Cloud className="h-5 w-5 text-gray-400" />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className="h-5 w-5 text-blue-400" />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow className="h-5 w-5 text-white" />;
    return <Sun className="h-5 w-5 text-yellow-400" />;
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchWeather = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&temperature_unit=fahrenheit`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    const data = await response.json();
                    setWeather({
                        temperature: Math.round(data.current.temperature_2m),
                        windspeed: Math.round(data.current.wind_speed_10m),
                        precipitation_probability: data.current.precipitation_probability,
                        weathercode: data.current.weather_code,
                    });
                    setError(null);
                } catch (e) {
                     setError("Could not fetch weather data.");
                     console.error(e);
                }
            },
            (err) => {
                setError("Could not access location. Please enable location services in your browser.");
                console.error(err);
            }
        );
    }
    
    fetchWeather();

  }, [isOpen]);

  const openStreetMapUrl = location
    ? `https://www.openstreetmap.org/#map=15/${location.latitude}/${location.longitude}`
    : '#';


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button variant="ghost" className="h-9 rounded-full text-muted-foreground hover:text-foreground px-4">
              {weather ? (
                  <>
                      {getWeatherIcon(weather.weathercode)}
                      <span className="ml-2 font-semibold">{weather.temperature}°F</span>
                  </>
              ) : (
                  <>
                      <Sun className="h-5 w-5" />
                      <span className="ml-2">Weather</span>
                  </>
              )}
              <span className="sr-only">View Weather</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Current Weather</DialogTitle>
          <DialogDescription>
            Live weather conditions for your current location.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {error && <p className="text-red-500">{error}</p>}
          {!weather && !error && (
             <div className="space-y-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
             </div>
          )}
          {weather && (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                             {getWeatherIcon(weather.weathercode)}
                             <p className="text-5xl font-bold">{weather.temperature}°F</p>
                        </div>
                       
                    </div>
                    <div className="text-right">
                         <a href={openStreetMapUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            View on Map
                        </a>
                    </div>
                </div>


              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-primary/5 p-3 rounded-lg">
                    <Droplets className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-sm mt-1 text-muted-foreground">Precipitation</p>
                    <p className="font-bold">{weather.precipitation_probability}%</p>
                </div>
                 <div className="bg-primary/5 p-3 rounded-lg">
                    <Wind className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-sm mt-1 text-muted-foreground">Wind</p>
                    <p className="font-bold">{weather.windspeed} mph</p>
                </div>
                 <div className="bg-primary/5 p-3 rounded-lg">
                    <Thermometer className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-sm mt-1 text-muted-foreground">Feels Like</p>
                    <p className="font-bold">{weather.temperature}°F</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
