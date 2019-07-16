const BikeDao = require('./Dao/bikesDao');
const bikeDao = new BikeDao();

const app = async () => {
    let savedBike = await bikeDao.saveEntity({
        model: 'TX90',
        company: 'MERIDA'
    });
    console.log('Saved bike -->', savedBike);

    savedBike.completed = 1;
    let isUpdated = await bikeDao.updateEntity(savedBike);
    console.log('Is it updated --> ', isUpdated);

    let savedBikeTwo = await bikeDao.saveEntity({
        model: 'Big-9',
        company: 'HUGE'
    });
    console.log('Saved bike -->', savedBikeTwo);


    let bikeList = await bikeDao.readEntities();
    console.log('List of bikes --> ', bikeList);

    let isDeleted = await bikeDao.deleteEntity(savedBike.id);
    console.log('Is it deleted --> ', isDeleted);

    let bikeListAfter = await bikeDao.readEntities();
    console.log('List of bikes after --> ', bikeListAfter);
}

app();
