//
// Card identification
//

var CreditCard = {
  CARDS: {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    Amex: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  },
  validate: function(number){
    return CreditCard.verifyLuhn10(number) && !!CreditCard.type(number) && !CreditCard.isTestNumber(number);
  },
  verifyLuhn10: function(number){
    return ($A(CreditCard.strip(number)).reverse().inject(0,function(a,n,index){
      return a + $A((parseInt(n) * [1,2][index%2]).toString())
        .inject(0, function(b,o){ return b + parseInt(o) }) }) % 10 == 0);
  },
  isTestNumber: function(number){
    return CreditCard.TEST_NUMBERS.include(CreditCard.strip(number));
  },
  strip: function(number) {
    return number.replace(/[^0-9.]/g, '');
  },
  type: function(number) {
    for(var card in CreditCard.CARDS)
      if(CreditCard.CARDS[card].test(CreditCard.strip(number))) return card;
  }
};
