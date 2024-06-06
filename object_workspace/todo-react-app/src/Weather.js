import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    const APIKey = 'df0044ff4fb762a1c09d857450de6f45'; // Replace with your OpenWeatherMap API key

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            }, () => {
                setError(true);
            });
        } else {
            setError(true);
        }
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`);
            setWeather(response.data);
            setError(false);
        } catch {
            setError(true);
        }
    };

    const getWeatherImage = (main) => {
        switch (main.toLowerCase()) {
            case 'clear':
                return 'images/clear.png';
            case 'rain':
                return 'images/rain.png';
            case 'snow':
                return 'images/snow.png';
            case 'clouds':
                return 'images/clouds.png';
            case 'haze':
                return 'images/mist.png';
            default:
                return 'images/default.png';
        }
    };

    return (
        <div className="container">
            {error && (
                <div className="not-found fadeIn">
                    <img src="images/404.png" alt="Not Found" />
                    <p>Oops! Unable to fetch weather data :/</p>
                </div>
            )}
            
            {weather && (
                <div>
                    <div className="weather-box fadeIn">
                        <img 
                            src={getWeatherImage(weather.weather[0].main)} 
                            alt={weather.weather[0].main}
                        />
                        <p className="temperature">{parseInt(weather.main.temp)}<span>°C</span></p>
                        <p className="description">{weather.weather[0].description}</p>
                    </div>
                    <div className="weather-details fadeIn">
                        <div className="humidity">
                            <i className="fa-solid fa-water"></i>
                            <div className="text">
                                <span>{weather.main.humidity}%</span>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="wind">
                            <i className="fa-solid fa-wind"></i>
                            <div className="text">
                                <span>{parseInt(weather.wind.speed)}Km/h</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;

// import React, { useEffect, useState } from 'react';
// import { Paper, Typography, Box } from '@mui/material';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import OpacityIcon from '@mui/icons-material/Opacity';
// import AirIcon from '@mui/icons-material/Air';

// const Container = styled(Paper)({
//   position: 'relative',
//   width: '400px',
//   height: 'auto',
//   background: '#fff',
//   padding: '40px 32px',
//   overflow: 'hidden',
//   borderRadius: '18px',
//   fontFamily: "'Lato', sans-serif",
//   transition: '0.6s ease-out',
//   textAlign: 'center',
//   marginTop: '20px',
//   marginBottom: '20px'
// });

// const WeatherBox = styled(Box)({
//   textAlign: 'center',
// });

// const WeatherImage = styled('img')({
//   width: '60%',
//   marginTop: '30px',
// });

// const Temperature = styled(Typography)({
//   position: 'relative',
//   color: '#06283D',
//   fontSize: '4rem',
//   fontWeight: 800,
//   marginTop: '30px',
//   marginLeft: '-16px',
//   fontFamily: "'Roboto', sans-serif"
// });

// const TemperatureSpan = styled('span')({
//   position: 'absolute',
//   marginLeft: '4px',
//   fontSize: '1.5rem',
// });

// const Description = styled(Typography)({
//   color: '#06283D',
//   fontSize: '22px',
//   fontWeight: 500,
//   textTransform: 'capitalize',
// });

// const WeatherDetails = styled(Box)({
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   marginTop: '30px',
// });

// const DetailItem = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   width: '50%',
//   height: '100px',
//   justifyContent: 'center',
// });

// const DetailIcon = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginRight: '10px',
// });

// const DetailsText = styled(Typography)({
//   color: '#06283D',
//   fontSize: '22px',
//   fontWeight: 500,
// });

// const DetailsP = styled(Typography)({
//   color: '#06283D',
//   fontSize: '14px',
//   fontWeight: 500,
// });

// const Location = styled(Typography)({
//   fontSize: '24px',
//   fontWeight: 600,
//   marginTop: '16px',
// });

// const Weather = () => {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const APIKey = '개인 api';

//     const fetchWeather = async (lat, lon) => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${APIKey}`
//         );
//         setWeather(response.data);
//         setError(false);
//       } catch (err) {
//         console.error(err);
//         setError(true);
//       }
//     };

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetchWeather(latitude, longitude);
//       },
//       (error) => {
//         console.error(error);
//         setError(true);
//       }
//     );
//   }, []);

//   if (error) {
//     return (
//       <Container>
//         <Typography variant="h5" color="error">
//           현재 위치의 날씨 정보를 가져올 수 없습니다.
//         </Typography>
//       </Container>
//     );
//   }

//   if (!weather) {
//     return (
//       <Container>
//         <Typography variant="h5">날씨 정보를 불러오는 중...</Typography>
//       </Container>
//     );
//   }

//   const { name, main, weather: weatherDetails, wind } = weather;
//   const weatherMain = weatherDetails[0].main;
//   let weatherImage = '';

//   switch (weatherMain) {
//     case 'Clear':
//       weatherImage = '/images/clear.png';
//       break;
//     case 'Rain':
//       weatherImage = '/images/rain.png';
//       break;
//     case 'Snow':
//       weatherImage = '/images/snow.png';
//       break;
//     case 'Clouds':
//       weatherImage = '/images/cloud.png';
//       break;
//     case 'Haze':
//       weatherImage = '/images/mist.png';
//       break;
//     default:
//       weatherImage = '';
//   }

//   return (
//     <Container>
//       <Typography variant="h5" gutterBottom style={{ fontFamily: "'Roboto', sans-serif" }}>오늘의 날씨</Typography>
//       <Location>{name}</Location>
//       <Typography variant="subtitle1" gutterBottom>
//         최고: {parseInt(main.temp_max)}°C / 최저: {parseInt(main.temp_min)}°C
//       </Typography>
//       <WeatherBox>
//         {weatherImage && <WeatherImage src={weatherImage} alt={weatherMain} />}
//         <Temperature>
//           {parseInt(main.temp)}
//           <TemperatureSpan>°C</TemperatureSpan>
//         </Temperature>
//         <Description>{weatherDetails[0].description}</Description>
//       </WeatherBox>
//       <WeatherDetails>
//         <DetailItem>
//           <DetailIcon>
//             <OpacityIcon fontSize="large" />
//           </DetailIcon>
//           <Box>
//             <DetailsText>{main.humidity}%</DetailsText>
//             <DetailsP>습도</DetailsP>
//           </Box>
//         </DetailItem>
//         <DetailItem>
//           <DetailIcon>
//             <AirIcon fontSize="large" />
//           </DetailIcon>
//           <Box>
//             <DetailsText>{parseInt(wind.speed)} Km/h</DetailsText>
//             <DetailsP>바람 속도</DetailsP>
//           </Box>
//         </DetailItem>
//       </WeatherDetails>
//     </Container>
//   );
// };

// export default Weather;