import $ from 'jquery';
import Rx from 'rxjs/Rx';

//Observable from event
const btn = $('#btn');
const input = $('#input');
const output = $('#in-out').find('span');
const mouseX = $('#mouse').find('#x');
const mouseY = $('#mouse').find('#y');
const clickCount = $('#counter').find('span');

const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(
	(e) => {
		clickCount.text(parseInt(clickCount.text()) + 1);
	},
	(err) => console.log(err),
	() => console.log('Completed'))

const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

inputStream$.subscribe(
	(e) => {
		output.text(e.target.value);
	},
	(err) => console.log(err),
	() => console.log('Completed'))

const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

moveStream$.subscribe(
	(e) => {
		mouseX.text('X: ' + e.clientX);
		mouseY.text('Y: ' + e.clientY);
	},
	(err) => console.log(err),
	() => console.log('Completed'))

// Observable from array
const numbers = [33, 44, 55, 66, 77];
const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(v => {
		console.log(v);
	}, err => {
		console.log(err);
	}, complete => {
		console.log('Completed');
	});

const posts = [
	{title: 'Post one', body: 'This is the body'},
	{title: 'Post two', body: 'This is the body'},
	{title: 'Post three', body: 'This is the body'}
];

const post$ = Rx.Observable.from(posts);

post$.subscribe(post => {
		$('#posts').append('<li>'+ post.title +'<h3>'+ post.body +'</h3></li>')
	}, err => {
		console.log(err);
	}, complete => {
		console.log('Completed');
	});

const set = new Set(['Hello', 44, {title: 'My Title'}]);
const set$ = Rx.Observable.from(set);

set$.subscribe(v => {
		console.log(v)
	}, err => {
		console.log(err);
	}, complete => {
		console.log('Completed');
	});


const source$ = new Rx.Observable(observer => {
	console.log('Creating Observable');
	observer.next('Hello, World');
	observer.next('Another Value');

	observer.error(new Error(''));
	setTimeout(() => {
		observer.next('Yet another value');
		observer.complete();
	}, 2000);
});

source$
.catch(err => Rx.Observable.of(err))
.subscribe(
	x => {
		console.log(x)
	}, err => {
		console.log(err)
	}, complete => {
		console.log('Completed');
	});

// Observable from promise
const myPromise = new Promise((resolve, reject) => {
	console.log('Creating Promise');
	setTimeout(() => {
		resolve('Hello From Promise');
	}, 2000);
});

function getUser(username){
	return $.ajax({
		url: 'https://api.github.com/users/' + username,
		dataType: 'jsonp'
	}).promise();
}

Rx.Observable.fromPromise(getUser('kenphanith'))
	.subscribe(x => {
		console.log(x)
		$('#name').text(x.data.login);
		$('#blog').text('Bio : ' + x.data.bio);
		$('#repos').text('Public Url : ' + x.data.url);
	})

// Map and Pluck
const mp$ = Rx.Observable.interval(1000)
	.take(10)
	.map(v => v * 2);

mp$.subscribe(v => console.log(v))