`use strict`;
import configAuth from '../config/auth';
import User from '../models/user';
import Place from '../models/place';
import request from 'request';

exports.search = (req, res, next) => {
  var userId = req.user ? req.user.id : null;

  var requestOptions = {
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: req.query,
    headers: {
      Authorization: `Bearer ${configAuth.yelpToken}`
    }
  };

  request(requestOptions, (err, response, body) => {
    console.log(body);
    const searchPlaces = JSON.parse(body).businesses;
    let placeUserData = {};
    let newSearchPlaces = [];
    Place.find({ placeId: searchPlaces.map(sp => sp.id) }).exec((err, data) => {
      data.forEach(element => {
        placeUserData[element.placeId] = {};
        placeUserData[element.placeId]['length'] = element.user.length;
        if (userId) {
          placeUserData[element.placeId]['added'] = element.user.id(userId)
            ? true
            : false;
        }
      });
      searchPlaces.forEach(element => {
        newSearchPlaces.push({
          id: element.id,
          name: element.name,
          image_url: element.image_url,
          rating: element.rating,
          review_count: element.review_count,
          user_count: placeUserData[element.id]
            ? placeUserData[element.id]['length']
            : 0,
          user_going: placeUserData[element.id]
            ? placeUserData[element.id]['added']
            : 0
        });
      });
      res.json(newSearchPlaces);
    });
  });
};

exports.toggleChoice = (req, res, next) => {
  Place.findOne({ placeId: req.body.placeId }).exec((err, place) => {
    var added = false;
    if (err) {
      console.log(err);
    }
    if (place) {
      if (place.user.id(req.user.id)) {
        place.user.remove(req.user.id);
        added = false;
        if (!place.user.length) {
          place.remove();
        }
        res.json({
          placeId: place.placeId,
          added
        });
      } else {
        place.user.push(req.user);
        added = true;
        place.save((err, data) => {
          if (err) {
            console.log(err);
          }
          res.json({
            placeId: place.placeId,
            added
          });
        });
      }
    } else {
      const newPlace = new Place({ placeId: req.body.placeId });
      newPlace.user.push(req.user);
      newPlace.save((err, data) => {
        if (err) {
          console.log(err);
        }
        res.json({
          placeId: data.placeId,
          added: true
        });
      });
    }
  });
};
