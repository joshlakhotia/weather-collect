package learn.weather.models;

import java.util.Objects;

public class WeatherForecast {

    private int weatherForecastId;
    private String name;
    private String notes;
    private double latitude;
    private double longitude;
    private int weatherCollectionId;

    public WeatherForecast() {
    }

    public WeatherForecast(int weatherForecastId, String name, String notes, double latitude, double longitude, int weatherCollectionId) {
        this.weatherForecastId = weatherForecastId;
        this.name = name;
        this.notes = notes;
        this.latitude = latitude;
        this.longitude = longitude;
        this.weatherCollectionId = weatherCollectionId;
    }

    public int getWeatherForecastId() {
        return weatherForecastId;
    }

    public void setWeatherForecastId(int weatherForecastId) {
        this.weatherForecastId = weatherForecastId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getWeatherCollectionId() {
        return weatherCollectionId;
    }

    public void setWeatherCollectionId(int weatherCollectionId) {
        this.weatherCollectionId = weatherCollectionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WeatherForecast forecast = (WeatherForecast) o;
        return weatherForecastId == forecast.weatherForecastId && Double.compare(latitude, forecast.latitude) == 0 && Double.compare(longitude, forecast.longitude) == 0 && weatherCollectionId == forecast.weatherCollectionId && Objects.equals(name, forecast.name) && Objects.equals(notes, forecast.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(weatherForecastId, name, notes, latitude, longitude, weatherCollectionId);
    }
}
