import bcrypy from 'bcrypt'
const healpers = {}

healpers.encryptingpassword = async (password) => {
    const salt = await bcrypy.genSalt(10);
    const hash = await bcrypy.hash(password, salt);
    return hash;
}

healpers.login = async (password, savedpassword) => {
    try{
        await bcrypy.compare(password, savedpassword)
      } catch {
        console.log(e)
      }
      
      
}

export default healpers