
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
import { Thermometer, Wind, Droplets, Sun, Cloud, CloudRain, CloudSnow, MapPin, LocateFixed, Map, Waypoints, Bike } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ScrollArea } from "./ui/scroll-area";

type WeatherData = {
    temperature: number;
    windspeed: number;
    precipitation_probability: number;
    weathercode: number;
    feelsLike: number;
}

type Location = {
    latitude: number;
    longitude: number;
}

function getWeatherIcon(code: number, className: string = "h-6 w-6") {
    if (code === 0) return <Sun className={cn(className, "text-yellow-400")} aria-label="Clear sky" />;
    if (code >= 1 && code <= 3) return <Cloud className={cn(className, "text-gray-400")} aria-label="Cloudy" />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className={cn(className, "text-blue-400")} aria-label="Rainy" />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow className={cn(className, "text-white")} aria-label="Snowy" />;
    return <Sun className={cn(className, "text-yellow-400")} aria-label="Clear sky" />;
}


export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mapLayer, setMapLayer] = useState('mapnik');

  const fetchWeatherForLocation = useCallback(async (lat: number, lon: number) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&temperature_unit=fahrenheit`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather({
            temperature: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            windspeed: Math.round(data.current.wind_speed_10m),
            precipitation_probability: data.current.precipitation_probability,
            weathercode: data.current.weather_code,
        });
        setError(null);
    } catch (e) {
         setError("Could not fetch weather data.");
         console.error(e);
    } finally {
        setLoading(false);
    }
  }, []);

  const requestLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeatherForLocation(latitude, longitude);
        },
        (err) => {
            switch(err.code) {
                case err.PERMISSION_DENIED:
                    setError("Location access denied. Please enable it in your browser settings to see local weather.");
                    break;
                case err.POSITION_UNAVAILABLE:
                    setError("Location information is unavailable.");
                    break;
                case err.TIMEOUT:
                    setError("The request to get user location timed out.");
                    break;
                default:
                    setError("An unknown error occurred while accessing location.");
                    break;
            }
            setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [fetchWeatherForLocation]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const openStreetMapUrl = location
    ? `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`
    : '#';

  const mapEmbedUrl = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude-0.1},${location.latitude-0.1},${location.longitude+0.1},${location.latitude+0.1}&layer=${mapLayer}&marker=${location.latitude},${location.longitude}`
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4">
              {loading ? (
                 <>
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-12 ml-2" />
                 </>
              ) : weather ? (
                  <>
                      {getWeatherIcon(weather.weathercode, "h-5 w-5")}
                      <span className="ml-2 font-semibold">{weather.temperature}°F</span>
                  </>
              ) : (
                  <>
                      <LocateFixed className="h-5 w-5" />
                      <span className="ml-2">Weather</span>
                  </>
              )}
              <span className="sr-only">View Weather</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl border-primary/20 flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Current Weather</DialogTitle>
          <DialogDescription>
            {error ? "Could not retrieve weather data." : "Live weather conditions for your current location."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1">
            <div className="py-4 pr-6">
              {loading && !error && (
                 <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Skeleton className="h-12 w-48" />
                           <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    </div>
                 </div>
              )}
              {weather && location && !error && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg border min-h-[300px] overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                className="w-full h-full"
                                src={mapEmbedUrl}
                                title="Map of current location"
                                aria-label="Map showing the user's current geographical location"
                            ></iframe>
                        </div>
                         <div className="space-y-3">
                             <ToggleGroup 
                                type="single" 
                                value={mapLayer} 
                                onValueChange={(value) => value && setMapLayer(value)}
                                className="justify-center"
                                variant="outline"
                            >
                                <ToggleGroupItem value="mapnik" aria-label="Standard map view" className="gap-2">
                                    <Map className="h-4 w-4"/>
                                    Standard
                                </ToggleGroupItem>
                                <ToggleGroupItem value="cyclemap" aria-label="Cycle map view" className="gap-2">
                                    <Bike className="h-4 w-4"/>
                                    Cycle
                                </ToggleGroupItem>
                                <ToggleGroupItem value="transportmap" aria-label="Transport map view" className="gap-2">
                                    <Waypoints className="h-4 w-4"/>
                                    Transport
                                </ToggleGroupItem>
                            </ToggleGroup>
                             <Button asChild variant="outline" size="sm">
                                <a href={openStreetMapUrl} target="_blank" rel="noopener noreferrer">
                                   <MapPin className="h-4 w-4 mr-2" />
                                    View on OpenStreetMap
                                </a>
                            </Button>
                         </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                     {getWeatherIcon(weather.weathercode, "h-16 w-16")}
                                     <div>
                                        <p className="text-5xl font-bold">{weather.temperature}°F</p>
                                        <p className="text-muted-foreground">Feels Like {weather.feelsLike}°F</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-4">
                                <Droplets className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Precipitation</p>
                                    <p className="font-bold text-lg">{weather.precipitation_probability}%</p>
                                </div>
                            </div>
                             <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-4">
                                <Wind className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Wind</p>
                                    <p className="font-bold text-lg">{weather.windspeed} mph</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Location data is based on your browser's location services. Weather data is provided by Open-Meteo. Map tiles by OpenStreetMap.
                        </p>
                    </div>
                </div>
              )}
              {error && (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <LocateFixed className="h-12 w-12 text-destructive" />
                  <p className="text-destructive max-w-sm">{error}</p>
                  <Button onClick={requestLocation} className="mt-4">
                    Retry Location Access
                  </Button>
                </div>
              )}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
