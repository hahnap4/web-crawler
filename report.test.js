const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js');

test('sorts pages from biggest to smallest number of links', () => {
    const input = {
      'http://google.com': 6,
      'http://yahoo.com': 1,
      'http://bing.com': 3,
      'https://wagslane.com': 10,
      'http://github.com': 7 
    }
    const actual = sortPages(input)
    const expected = [
      [ 'https://wagslane.com', 10 ],
      [ 'http://github.com', 7 ],
      [ 'http://google.com', 6 ],
      [ 'http://bing.com', 3 ],
      [ 'http://yahoo.com', 1 ]
    ]
    expect(actual).toEqual(expected)
  })
  
  test('sorting null object results in an empty array', () => {
    const input = {}
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
  })