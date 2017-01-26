require('./weather-card.scss');
import React from 'react';
import axios from 'axios';

export default class WeatherCard extends React.Component {

	constructor(props) {
		super(props);
	}

	add(e) {
		this.props.setOverlay(true);
	}

	delete(e) {
		const data = {
			city: this.props.info.position
		};
		axios.delete('/api/cities', {data}).then(res => {
			this.props.reload();
		}).catch(err => {
			throw err;
		});
	}

	getTime() {
		const date = new Date();
		const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
		let hours;
		if(date.getHours() === 0) {
			hours = 12;
		} else if(date.getHours() <= 12) {
			hours = date.getHours();
		} else {
			hours = date.getHours() - 12;
		}
		const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		return `${hours}:${minutes} ${suffix}`;
	}

	render() {
		const {info} = this.props;
		return (
			<article className='card-wrapper'>
				<section className='card-buttons-wrapper'>
					<section
						className='card-button card-add-button'
						onClick={this.add.bind(this)}
					>
						<i className='fa fa-plus card-add-icon' />
					</section>
					<section
						className='card-button card-close-button'
						onClick={this.delete.bind(this)}
					>
						<i className='fa fa-close card-close-icon' />
					</section>
				</section>
				<section className='card-header'>
					<i className='fa fa-clock-o card-clock' />
					<p className='card-time'>{this.getTime()}</p>
					<p className='card-location'>{info.name}, {info.country}</p>
				</section>
				<img className='card-weather-image' src={`img/${info.icons[0]}`} />
				<section className='card-body'>
					<section className='card-center-column'>
						<p className='card-description'>{info.description}</p>
						<p className='card-current-temp'>{info.currentTemp}&deg;</p>
						<section className='card-temp-predictions'>
							<p className='card-temp-hi'>H {info.maxTemp}&deg;</p>
							<p className='card-temp-lo'>L {info.minTemp}&deg;</p>
						</section>
					</section>
				</section>
			</article>
		);
	}

}
