var assert = require('assert')
var MembershipApplication = require('../models/membership_application')

describe('Applying for mission', function() {
  var validApp

  before(function(){
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    })
  })

  describe('Application valid if...', function () {
    it("all validators successful", function(){
      assert(validApp.isValid(), 'Not valid')
    })
  })
  describe('Application is invalid if...', function () {
    it('is expired', function () {
      var app = new MembershipApplication({validUntil: Date.parse('01/01/2010')})
    })
    it('email is less than 4 chars', function () {
      var app = new MembershipApplication({ email: 'd@d'})
      assert(!app.emailIsValid())
    })
    it('email does not have an @', function () {
      var app = new MembershipApplication({ email: 'thajjdjkjkdj'})
      assert(!app.emailIsValid())
    })
    it('email is omitted', function () {
      var app = new MembershipApplication()
      assert(!app.emailIsValid())
    })
    it('height is less than 60 inches', function () {
      var app = new MembershipApplication({ height: 58 })
      assert(!app.heightIsValid())
    })
    it('height is more than 75 inches', function () {
      var app = new MembershipApplication({ height: 78 })
      assert(!app.heightIsValid())
    })
    it('height is omitted', function () {
      var app = new MembershipApplication()
      assert(!app.heightIsValid())
    })
    it('age is more than 100',function (){
      var app = new MembershipApplication({ age: 102 })
      assert(!app.ageIsValid())
    })
    it('age is less than 15',function (){
      var app = new MembershipApplication({ age: 12 })
      assert(!app.ageIsValid())
    })
    it('age is omitted',function (){
      var app = new MembershipApplication()
      assert(!app.ageIsValid())
    })
    it('weight is less than 100',function (){
      var app = new MembershipApplication({ weight: 98 })
      assert(!app.weightIsValid())
    })
    it('weight is more than 300',function (){
      var app = new MembershipApplication({ weight: 302 })
      assert(!app.weightIsValid())
    })
    it('weight is omitted',function (){
      var app = new MembershipApplication()
      assert(!app.weightIsValid())
    })
    it('first name is omitted',function (){
      var app = new MembershipApplication({ last: 'Silva' })
      assert(!app.nameIsValid())
    })
    it('last name is omitted', function () {
      var app = new MembershipApplication({ first: 'Yugi' })
      assert(!app.nameIsValid())
    })
  })
})