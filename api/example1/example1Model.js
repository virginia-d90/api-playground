const axios = require('axios');
const bbConfig = require('../../config/bbConfig');
const bbClient = axios.create(bbConfig);
const db = require('../../data/dbConfig')

const getData = () => {
    return bbClient.get('/characters')
};

function addCharacters(arr) {
    return db('characters').insert(arr);
  }

function addOcc(arr1){
    return db('occupations').insert(arr1)
}
const getOcc = () => {
    return bbClient.get('/characters/1')
}

function getCharacters(){
    // return db('characters')
    // .join('occupations', 'occupations.char_id', 'characters.id')
    // .select('characters.*', 'occupations')
   
    // return db('characters')
    // .joinRelated('occupations', 'occupations.char_id', 'characters.id')
    // .where('characters.id', 'occupations.char_id')
    // .select('characters.*', 'occupations.occupation')
    return db('characters')
    .outerJoin('occupations', 'characters.id', 'occupations.char_id')
    .select('characters.id','characters.name', 'occupations.occupation')
} 

async function getChar(){
    const char = await db('characters')
        .innerJoin('occupations', 'characters.id', 'occupations.char_id')
        .select(['characters.*', db.raw('json_agg(occupations.*) as occupations')])
        .groupBy('characters.id')
        .orderBy('characters.id')

    return char
}

module.exports = { getData, addCharacters, getOcc, addOcc, getCharacters, getChar };