package learn.weather.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class WeatherCollection {

    private int weatherCollectionId;
    private String name;
    private String description;
    private int userId;
    private List<WeatherForecast> forecasts = new ArrayList<>();

    public WeatherCollection() {
    }

    public WeatherCollection(int weatherCollectionId, String name, String description, int userId) {
        this.weatherCollectionId = weatherCollectionId;
        this.name = name;
        this.description = description;
        this.userId = userId;
    }

    public int getWeatherCollectionId() {
        return weatherCollectionId;
    }

    public void setWeatherCollectionId(int weatherCollectionId) {
        this.weatherCollectionId = weatherCollectionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<WeatherForecast> getForecasts() {
        return forecasts;
    }

    public void setForecasts(List<WeatherForecast> forecasts) {
        this.forecasts = forecasts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WeatherCollection that = (WeatherCollection) o;
        return weatherCollectionId == that.weatherCollectionId && userId == that.userId && Objects.equals(name, that.name) && Objects.equals(description, that.description) && Objects.equals(forecasts, that.forecasts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(weatherCollectionId, name, description, userId, forecasts);
    }
}
