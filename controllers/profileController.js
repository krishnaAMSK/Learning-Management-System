const prisma = require('../prisma/db');

const getProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const userProfile = await prisma.userProfile.findUnique({
      where: { 
        userId: userId 
      },
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }
    return res.json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

const updateProfile = async (req, res) => {
  try {
    const userPersonalDetails = req.body;
    if (!userPersonalDetails) 
      return res.status(400).json({ 'message': 'No user details has been sent.' });
    
    const userId = parseInt(req.params.userId);
    const userRole = req.userRole;

    const userExist = await prisma.userProfile.findUnique({
      where: {
        userId: userId
      }
    });

    if(userExist && userPersonalDetails){
      async function updateUserProfile(userDetails, userId, userRole){
        try{
          await prisma.userProfile.update({
            where:{
              userId: userId
            },
            data:{
              fullName: userDetails.fullName,
              age: userDetails.age,
              gender: userDetails.gender,
              profession: userDetails.profession,
              universityName: userDetails.universityName,
              contactNumber: userDetails.contactNumber,
              address: userDetails.address,
            }
          });
          console.log("User profile has been updated.");
          return res.status(200).json({"message":"User profile has been updated."})
        }catch (error){
          console.log(error);
          return res.status(500).json({"message":"Internal server error"});
        }
      }
      updateUserProfile(userPersonalDetails, userId, userRole);
    }

    // When no already existing user is there.
    else{
      async function createUserProfile(userDetails, userId, userRole){
        try{
          await prisma.userProfile.create({
            data:{
              userId: userId,
              fullName: userDetails.fullName,
              age: userDetails.age,
              gender: userDetails.gender,
              profession: userDetails.profession,
              universityName: userDetails.universityName,
              contactNumber: userDetails.contactNumber,
              address: userDetails.address,
              role: userRole,
            }
          });
          console.log("User profile has been created.");
          return res.status(200).json({"message":"User profile has been created."})
        }catch (error){
          console.log(error);
          return res.status(500).json({"message":"Internal server error"});
        }
      }

      createUserProfile(userPersonalDetails, userId, userRole);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({"message":"Internal server error"});
  }
}

module.exports = { getProfile, updateProfile };