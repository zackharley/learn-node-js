require('./weather-app.scss');
import React from 'react';
import WeatherCard from './../weather-card/weather-card';
import Overlay from './../overlay/overlay';
import axios from 'axios';

export default class WeatherApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			weather: [],
			city: 0,
			isOverlayActive: false
		}
	}

	updateCity(offset) {
		let newCity = this.state.city + offset;

		if(newCity < 0) {
			newCity = this.state.weather.length - 1;
		} else if(newCity >= this.state.weather.length) {
			newCity = 0;
		}

		this.setState({
			city:  newCity
		});
	}

	reload() {
		let _this = this;
		this.serverRequest = axios
			.get('/api/weather')
			.then(res => {
				_this.setState({
					city: 0,
					weather: res.data
				});
			})
			.catch(err => {
				throw err;
			});
	}

	setOverlay(bool) {
		this.setState({
			isOverlayActive: bool
		});
	}

	handleLeftClick(e) {
		this.updateCity(-1);
	}

	handleRightClick(e) {
		this.updateCity(1);
	}

	componentDidMount() {
		this.reload();
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	render() {
		window.state = this.state;
		return (
			<section className='app-wrapper'>
				<header className='app-header'>
					<h1 className='app-title'>My Weather</h1>
				</header>
				<section className='app-body-wrapper'>
					{
						this.state.weather.length >= 1 ?
						<section className='app-button'>
							<i
								className='fa fa-chevron-left'
								onClick={this.handleLeftClick.bind(this)}
							/>
						</section> :
						''
					}
					<section className='app-card-wrapper'>
						{
							this.state.weather.length >= 1 ?
							<WeatherCard
								info={this.state.weather[this.state.city]}
								reload={this.reload.bind(this)}
								setOverlay={this.setOverlay.bind(this)}
							/> :
							''
						}
					</section>
					{
						this.state.weather.length >= 1 ?
						<section className='app-button'>
							<i
								className='fa fa-chevron-right'
								onClick={this.handleRightClick.bind(this)}
							/>
						</section> :
						''
					}
				</section>
				<Overlay
					isActive={this.state.isOverlayActive}
					setOverlay={this.setOverlay.bind(this)}
					reload={this.reload.bind(this)}
				/>
			</section>
		);
	}

}
