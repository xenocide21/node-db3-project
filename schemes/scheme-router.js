const express = require('express');

const Schemes = require('./scheme-model.js');

const validation = require('../middleware/scheme-validation')

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
      .then(schemes => {
        res.json(schemes);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
      .then(scheme => {
        if (scheme) {
          res.json(scheme);
        } else {
          res.status(404).json({ message: 'Could not find scheme with given id.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
      });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
      .then(steps => {
        if (steps.length) {
          res.json(steps);
        } else {
          res.status(404).json({ message: 'Could not find steps for given scheme' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get steps' });
      });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
      .then( ids => {
        console.log(ids);
        if(ids) {
          Schemes.findById(ids[0])
              .then( resou => {
                res.status(201).json({ message: `status 201: successfully added scheme`, resource: resou });
              })
        } else {
          res.status(500);
        }

      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new scheme' });
      });
});

router.post('/:id/steps', (req, res) => {
  const id = req.params.id;
  const newStep = req.body;
  Schemes.addStep(newStep, id)
      .then( resu => {
        if(resu) {
          Schemes.findById(resu)
              .then(resou => {
                res.status(201).json({ message: `status 201: resource created`, resource: resou })
              })
        } else {
          res.status(400).json({ message: `status 400: client error, could not add resource` })
        }
      })
      .catch( err => {
        res.status(500).json({ message: `status 500: internal server error, could not add resource` })
      })
})

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
      .then(scheme => {
        if (scheme) {
          Schemes.addStep(stepData, id)
              .then(step => {
                res.status(201).json(step);
              })
        } else {
          res.status(404).json({ message: 'Could not find scheme with given id.' })
        }
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new step' });
      });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
      .then(scheme => {
        if (scheme) {
          Schemes.update(changes, id)
              .then(success => {
                if(success) {
                  Schemes.findById(id)
                      .then( resou => {
                        res.status(200).json({ message: `status 200: update successful`, resource: resou});
                      })
                } else {
                  res.status(500).json({ message: `status 500: internal server error` })
                }

              });
        } else {
          res.status(404).json({ message: 'Could not find scheme with given id' });
        }
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to update scheme' });
      });
});

router.delete('/:id', validation.validateId, (req, res) => {
  const { id } = req.params;
  Schemes.remove(id)
      .then(deleted => {
        console.log(deleted, 'deleted');
        res.status(200).json({ removed: req.resou });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete scheme' });
      });
});

module.exports = router;