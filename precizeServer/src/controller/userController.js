let satResults = [];
const calculatePassed = (score) => (score > 30 ? 'Pass' : 'Fail');

exports.deleteData = async (req, res) => {
    try {
        const { name } = req.params;

        satResults = satResults.filter((result) => result.name !== name);
        res.status(200).json({ message: 'Record deleted successfully' });


    } catch (err) {
        console.log(err);
    }

}

exports.updateScore = async (req, res) => {
    try {

        const { name } = req.params;
        const { satScore } = req.body;

        const index = satResults.findIndex((result) => result.name === name);

        if (index !== -1) {
            satResults[index].satScore = satScore;
            satResults[index].passed = calculatePassed(satScore);

            res.status(200).json({ message: 'Score updated successfully' });
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.insertData = async (req, res) => {
    try {
        const { name, address, city, country, pincode, satScore } = req.body;

        const existingData = satResults.find((data) => data.name === name);
        if (existingData) {
            return res.status(400).json({ error: 'Name must be unique' });
        }

        const passed = calculatePassed(satScore);

        const newData = { name, address, city, country, pincode, satScore, passed, };

        satResults.push(newData);
        res.status(200).json({ message: 'Data inserted successfully' });


    } catch (err) {
        console.log(err);
    }
}

exports.getRank = async (req, res) => {
    try {

        const { name } = req.params;
        const sortedResults = [...satResults].sort((a, b) => b.satScore - a.satScore);
        const rank = sortedResults.findIndex((result) => result.name === name) + 1;

        if (rank == 0)
            res.status(404).json({ error: 'Record not found' });
        else
            res.status(200).json({ rank });

    } catch (err) {
        console.log(err);
    }
}

exports.viewData = async (req, res) => {
    try {
        res.status(200).json(satResults);
    } catch (err) {
        console.log(err);
    }
}
