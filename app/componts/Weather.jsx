'use client';
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const API_KEY = '5ea541e0c6e7f667e159f59dc49e94e9';         
export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'An error occurred');
            }
        };
        fetchWeather()
    },[])


    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-gradient-to-r from-teal-400 to-sky-600 rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105">
            <h1 className="text-5xl font-bold text-center text-white drop-shadow-lg">Weather App</h1>
            <form onSubmit={handleSearch} className="mt-5">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="border border-gray-300 text-black font-bold p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition"
                />
                <button
                    type="submit"
                    className="bg-white text-teal-600 font-semibold p-3 rounded-md mt-2 w-full hover:bg-teal-600 hover:text-white transition"
                >
                    Search
                </button>
            </form>

            {loading && <p className="text-center mt-3 text-white">Loading...</p>}
            {error && <p className="text-red-500 text-center mt-3">{error}</p>}

            {weatherData && (
                <div className="mt-5 text-center text-white">
                    <h2 className="text-4xl font-semibold">{weatherData.name}</h2>
                    <h3 className="text-2xl">{weatherData.weather[0].main}</h3>
                    <p className="text-6xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt={weatherData.weather[0].description}
                        className="mx-auto my-2"
                    />
                    <div className="mt-3">
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {Math.round(weatherData.wind.speed)} m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}
