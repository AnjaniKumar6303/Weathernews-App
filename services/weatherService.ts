export async function fetchWeather(lat: number, lon: number, apiKey: string) {
  const base = "https://api.openweathermap.org/data/2.5";
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${base}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
    fetch(`${base}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
  ]);

  const current = await currentRes.json();
  const forecast = await forecastRes.json();

  return {
    now: {
      tempC: current.main.temp,
      condition: current.weather?.[0]?.description || "",
      icon: current.weather?.[0]?.icon || "01d",
      city: current.name,
      country: current.sys?.country || "",
    },
    forecast: (forecast.list || []).slice(0, 5).map((f: any) => ({
      date: f.dt_txt,
      minC: f.main.temp_min,
      maxC: f.main.temp_max,
      icon: f.weather[0].icon,
      condition: f.weather[0].description,
    })),
  };
}
