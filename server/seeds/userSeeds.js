const {User} = require('../model')

const user = [
    {
        user: 'Bob',
    }
]

const userSeed = async () => {
    try {
        await User.deleteMany({});
        const users = await User.insertMany(user);
        console.log(users);
        return;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = {userSeed};