


 const permissions = {
     medicine: {
      pharmacy: {
        delete: true,
        edit: true
      }
     },
     prescriptions: {
      pharmacy: {
        view: true
      }
     },
     orders: {
      pharmacy: {
        view: true,
        delete: true,
        edit: true
      }
     }
 }

 export default permissions
