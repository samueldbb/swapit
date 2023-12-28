module.exports = {

  BASE_URL:'http://localhost27017:',
  roles:{
    default: 0,
    carrier: 0,
    company: 1,
    administration : 2
  },
  typesOfNft:{
    sender: 0,
    receiver: 1,
    pay:2,
    administration:3
  },
  typeStamp:{
    pay:0,
    reception: 1,
    deliver: 2,
    administration: 3,
  },
  typeNFT:{
    Reception :'Reception',
    Deliver : 'Disposal',
    Pay : 'Pay',
    Administration : 'Administration'
  },
  steps: [
    "Pay",
    "Reception",
    "Disposal",
    "Administration"
  ],
  paymentSeller: {
    Ous: 0.1,
    Llet: 0.2,
    Carn: 0.3,
    Pasta: 0.4
  },
  paymentBuyer: {
    Ous: 0.05,
    Llet: 0.1,
    Carn: 0.15,
    Pasta: 0.3
  },
  keys: {
    name: "name",
    email: "email",
    phone: "phone",
    nif: "nif",
    personalAddress: "personalAddress",
    pass: 'pass',
    pk: 'pk',
    address : 'address'
  },
  decimals: 100000
}
