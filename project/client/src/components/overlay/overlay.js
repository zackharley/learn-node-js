require('./overlay.scss');
import React from 'react';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

export default class Overlay extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			coords: {
				lat: 0,
				lng: 0
			}
		}
	}

	componentDidMount() {
		const _this = this;
		navigator.geolocation.getCurrentPosition(
			pos => {
				const {coords} = pos;
				_this.setState({
					coords: new google.maps.LatLng({
						lat: coords.latitude,
						lng: coords.longitude
					})
				});
			},
			error => {
				throw error;
			}
		);
	}

	handleSuggestSelect(suggest) {
		this.props.setOverlay(false);

		const twoDecimalRegExp = /^-?\d+(?:\.\d{0,2})?/;

		const location = {
			lat: parseFloat(suggest.location.lat.toString().match(twoDecimalRegExp)[0]),
			lng: parseFloat(suggest.location.lng.toString().match(twoDecimalRegExp)[0])
		};

		const options = {
			url: '/api/cities',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				city: location
			}
		};

		const _this = this;

		axios.request(options)
			.then(res => {
				console.log(res);
				_this.setState({

				});
				_this.props.reload();
			})
			.catch(err => {
				throw err;
			});
	}

	render() {
		return  (
			<section className={this.props.isActive ? 'overlay-wrapper' : 'overlay-wrapper hidden'}>
				<section className={}
				<Geosuggest
					types={['(cities)']}
					radius={500}
					location={this.state.coords}
					onSuggestSelect={this.handleSuggestSelect.bind(this)}
				/>
			</section>
		);
	}

}
