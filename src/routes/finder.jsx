import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MAPS_API_KEY } from "@/lib/google-services";
import { useState, useCallback } from "react";
import { MapPin, Navigation, Info, Search } from "lucide-react";

export const Route = createFileRoute("/finder")({
  component: PollingFinderPage,
});

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Mock polling stations for demo
const mockStations = [
  { id: 1, name: "Public School 101", pos: { lat: 40.7138, lng: -74.007 } },
  { id: 2, name: "Community Center Alpha", pos: { lat: 40.7158, lng: -74.004 } },
  { id: 3, name: "City Library Annex", pos: { lat: 40.7118, lng: -74.008 } },
];

function PollingFinderPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY || "",
  });

  const [map, setMap] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [selected, setSelected] = useState(null);
  const [locStatus, setLocStatus] = useState("idle"); // idle, loading, success, error

  // Automatic Geolocation
  const getMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
        setLocStatus("error");
        return;
    }
    setLocStatus("loading");
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setCurrentCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setLocStatus("success");
        },
        () => {
            setLocStatus("error");
        }
    );
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[var(--primary-soft)] px-4 py-1.5 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Location Tools
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find your{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              polling station
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Enter your address to see the nearest official voting locations on the map.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Map Section */}
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)]">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentCenter}
                zoom={14}
                onLoad={(m) => setMap(m)}
                options={{
                  styles: [{ featureType: "all", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }],
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                {mockStations.map((s) => (
                  <Marker
                    key={s.id}
                    position={s.pos}
                    onClick={() => setSelected(s)}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="flex h-[500px] items-center justify-center bg-secondary/30">
                <p className="text-muted-foreground">Loading Map...</p>
              </div>
            )}

            {locStatus === "error" && (
                <div className="absolute inset-x-4 top-4 z-10 flex items-center gap-3 rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive backdrop-blur-md border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Location access denied. Please use search or enable GPS.</span>
                    <button onClick={getMyLocation} className="ml-auto underline">Retry</button>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="flex items-center gap-2 font-bold text-foreground">
                <Search className="h-4 w-4 text-primary" />
                Search Area
              </h3>
              <div className="mt-4 relative">
                <input 
                  type="text" 
                  placeholder="Enter your zip code..." 
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="absolute right-2 top-2 rounded-lg bg-primary p-1.5 text-white">
                  <Navigation className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-bold text-foreground">Nearby Locations</h3>
              <div className="mt-4 space-y-4">
                {mockStations.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`flex w-full flex-col gap-1 rounded-xl border p-3 text-left transition-all ${
                      selected?.id === s.id
                        ? "border-primary bg-[var(--primary-soft)]"
                        : "border-border/60 hover:bg-secondary/40"
                    }`}
                  >
                    <span className="text-sm font-bold">{s.name}</span>
                    <span className="text-xs text-muted-foreground">0.4 miles away</span>
                    <span className="text-[10px] font-medium uppercase text-primary">Open 7am - 8pm</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/20">
              <div className="flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> Polling locations can change. Always verify with your local election board before heading out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
