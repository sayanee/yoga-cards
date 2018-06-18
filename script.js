Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {
      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
}

const fillRange = function(start, end) {
  return Array(end - start + 1).fill().map(function(item, index) {
    return start + index
  })
}

fetch('/data.json')
.then(function(response) {
  return response.json()
})
.then(function(data) {
  var app = new Vue({
    el: '#app',
    data: {
      allCards: data.data,
      cards: data.data,
      current: 0,
      length: data.data.length,
      show: false,
      order: [],
      recall: "english",
      category: "all"
    },
    methods: {
      shuffle: function() {
        this.order = fillRange(0, this.length - 1).shuffle()
        return this.order
      },
      nextCard: function(event) {
        if (this.show) {
          this.show = false
          this.current > this.length - 2 ? this.current = 0 : this.current++
        } else {
          this.show = true
        }

        return
      },
      list: function(category) {
        var cardList = []

        this.allCards.forEach(function(eachCard) {
          if (eachCard.category === category) {
            cardList.push(eachCard)
          }
        })

        this.current = 0
        this.cards = cardList
        this.length = this.cards.length
        this.order = fillRange(0, this.length - 1).shuffle()

        console.log(this.cards)
        return
      }
    }
  }).shuffle()
});
