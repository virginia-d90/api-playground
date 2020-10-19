const knex = require('knex')
const db = require('../data/dbConfig')
const example1Model = require('../api/example1/example1Model')

function wipeDB(){
    db('occupations').del()
        .then((response) => {
            console.log('occupations deleted')
        })
        .catch((error) => {
            console.log('occ could not be deleted')
        })
    db('characters').del()
        .then((response) => {
            console.log('char deleted')
        })
        .catch((error) => {
            console.log('char could not be deleted')
        })
    }
function populateDB(){
    example1Model
    .getData()
    .then((response) => {
      const charArray = response.data
      // console.log('charArray', charArray)
      const charactersMap = charArray.map((char) => ({
        id: char.char_id,
        name: char.name,
        birthday: char.birthday,
      
      }));
      
      const occMap = charArray.map((occ) => {
          // console.log('occ', occ.occupation)
          
          const occArray = occ.occupation.map((job) => ({
              char_id: occ.char_id,
              occupation: job
          }))
          return occArray
      })

    
      // console.log('occMap', occMap)
   
      // console.log('secondPass:', secondPass)
      example1Model.addCharacters(charactersMap)
      
        .then((arr) => {
          example1Model.addOcc(occMap.flat())
              .then((response) => {
                  console.log('addOcc response:', response)
                  
              })
              .catch((error) => {
                  console.log(error)
              })
        })
        .catch((error) => {
          console.log(error)
        });
    })
    .catch((error) => {
      console.log(error);
      
    });
}

module.exports = {wipeDB, populateDB}