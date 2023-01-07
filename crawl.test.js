const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('https://blog.blake.com/pathhere is normalized', () => {
    const input = 'https://blog.blake.com/pathhere';
    const actual = normalizeURL(input);
    const output = 'blog.blake.com/pathhere';
    expect(actual).toBe(output);
})

test('http://wagsLane.dev/Path is normalized', () => {
    const input = 'http://wagsLane.dev/Path';
    const actual = normalizeURL(input);
    const output = 'wagslane.dev/path';
    expect(actual).toBe(output);
})

test('https://WAGSlane.dev/Path is normalized', () => {
    const input = 'https://WAGSlane.dev/Path';
    const actual = normalizeURL(input);
    const output = 'wagslane.dev/path';
    expect(actual).toBe(output);
})

test('http://wagslane.dev/path is normalized', () => {
    const input = 'http://wagslane.dev/path';
    const actual = normalizeURL(input);
    const output = 'wagslane.dev/path';
    expect(actual).toBe(output);
})

test.failing('wagslane.dev/path throws error and will fail test', () => {
    const input = 'wagslane.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toBe('wagslane.dev/path');
})

test.failing('123 will fail test, due to error', () => {
    const input = 123;
    const actual = normalizeURL(input);
    expect(actual).toBe('Invalid URL');
})

test('really long url with http is normalized', () => {
    const input = 'http://wejfaoewjfoawiifjaw.com/fjawioefjeawoifjaiowjgioagjea/sjfaioaejfioawjfwa/fjeawiofjeowafja/jfewioafjeaowifjwa/jfeowiajfioewa';
    const actual = normalizeURL(input);
    const output = 'wejfaoewjfoawiifjaw.com/fjawioefjeawoifjaiowjgioagjea/sjfaioaejfioawjfwa/fjeawiofjeowafja/jfewioafjeaowifjwa/jfeowiajfioewa';
    expect(actual).toBe(output);
})

test('relative url converts to absolute url', () => {
    const input = '<!DOCTYPE html><body><a href="/path-is-here">Click here</a><a href="/here-we-go">Here We Go</a></body>';
    const baseURL = 'http://laneswag.com'
    const actual = getURLsFromHTML(input, baseURL);
    const output = ['http://laneswag.com/path-is-here', 'http://laneswag.com/here-we-go'];
    expect(actual).toStrictEqual(output);
})

test('check if you found all <a> tags in html body', () => {
    const input = '<!DOCTYPE html><body><a href="http://laneswag.com/path-is-here">Click here</a><a href="https://google.com/here-we-go">Here We Go</a></body>';
    const baseURL = 'http://laneswagger.com';
    const actual = getURLsFromHTML(input, baseURL);
    const output = ["http://laneswag.com/path-is-here", "https://google.com/here-we-go"];
    expect(actual).toStrictEqual(output);
})