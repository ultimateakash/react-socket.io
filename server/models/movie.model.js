'use strict';
module.exports = (sequelize, DataTypes) => { 
    
    const Movie = sequelize.define('Movie', { 
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        rating: DataTypes.FLOAT(10, 1)
    }, {
        underscored: true
    })

    Movie.associate = function(models) {
        // define your relations 
    }

    return Movie;
};
