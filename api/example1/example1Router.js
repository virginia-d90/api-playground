require('dotenv').config();
const axios = require('axios');
const example1Model = require('./example1Model');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({error:false, message: "welcome to example1"})
})
router.get('/occupations', function (req, res) {
    example1Model
        .getOcc()
        .then((response) => {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(500).json('could not get occupations')
        })
})

router.get('/characters', (req, res) => {
    example1Model
        .getChar()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({error:error})
        })
})
router.get('/populate', function (req, res) {
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

        const flatMap = occMap.flat()
        console.log(flatMap)
        // console.log('occMap', occMap)
     
        // console.log('secondPass:', secondPass)
        example1Model.addCharacters(charactersMap)
        // console.log('charMap', charactersMap)
          .then((arr) => {
            example1Model.addOcc(occMap.flat())
                .then((response) => {
                    console.log('addOcc response:', response)
                    res.status(201).json({message: 'occupations inserted'})
                })
                .catch((error) => {
                    res.status(500).json({message: "add occupations failed"})
                })
          })
          .catch((error) => {
            res.status(500).json({ message: 'add Characters failed', error: error });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error, error_found: true });
      });
  });


module.exports = router