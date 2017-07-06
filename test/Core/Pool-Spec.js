define(['Class', 'Pool'], function(Class, Pool) {
	/* globals beforeEach, it, describe, expect */
	"use strict";
	var pool = null,
		obj,
		obj1,
		obj2,
		obj3;


	var MyObject = Class.extend({
		init: function(id) {
			this.id = id;
		},
		foo: function() {
			console.log('foo');
		},
		bar: function() {

		}
	})

	beforeEach(function() {
		Pool.create(MyObject, 10);
	});

	describe('Pool creation', function() {
		it('obj has ._pool* members', function() {
			expect(MyObject._pool).toBeDefined();
			expect(MyObject._pool.length).toEqual(10);
			expect(MyObject._poolMarker).toEqual(0);
			expect(MyObject._poolSize).toEqual(10);
			expect(MyObject._pool[0]).toBeDefined();
		});
	});

	describe('Pool object creation', function() {
		it('obj constructor is called', function() {
			var myObj = MyObject.createFromPool(5);

			expect(myObj).toBeDefined();
			expect(myObj.id).toEqual(5);
		});

		it('pool marker is updated', function() {
			var myObj = MyObject.createFromPool(5);

			expect(MyObject._poolMarker).toEqual(1);
		});

		it('pool size is inscreased on need', function() {
			var myObj,
				size = MyObject._poolSize;

			for (var i = 0; i < size; i++) {
				myObj = MyObject.createFromPool(5);
			}

			expect(MyObject._poolMarker).toEqual(10);

			myObj = MyObject.createFromPool(5);

			expect(MyObject._poolMarker).toEqual(11);
			expect(MyObject._poolSize).toEqual(20);
			expect(MyObject._pool.length).toEqual(20);
		});
	});

	describe('Pool object destruction', function() {
		it('Removing all objects in order', function() {
			console.log('test 1');

			var objects = [];

			for (var i = 0; i < 4; ++i) {
				objects.push(MyObject.createFromPool(i));
			}

			objects[0].freeFromPool();

			console.log(objects[0], objects[3]);
			expect(objects[0] === objects[3]).toBe(false);
		});
	});

	// describe('LinkList creation', function() {
	// 	it('length = 0', function() {
	// 		expect(list.length).toEqual(0);
	// 	});
	//
	// 	it('list.first() === null', function() {
	// 		expect(list.first()).toEqual(null);
	// 	});
	//
	// 	it('list.last() === null', function() {
	// 		expect(list.last()).toEqual(null);
	// 	});
	// });
	//
	// describe('list makeNode', function() {
	// 	it('makeNode returns correct object', function() {
	// 		var node = list.makeNode(obj);
	//
	// 		expect(node.data).toEqual(obj);
	// 		expect(node._prevNode).toEqual(null);
	// 		expect(node._nextNode).toEqual(null);
	// 	});
	// });
	//
	// describe('list insertion', function() {
	// 	beforeEach(function() {
	// 		list.insert(obj);
	// 	});
	//
	// 	it('list.length === 1', function() {
	// 		expect(list.length).toEqual(1);
	// 	});
	//
	// 	it('list.first() is defined', function() {
	// 		expect(list.first()).not.toEqual(null);
	// 	});
	//
	// 	it('list.last() is defined', function() {
	// 		expect(list.last()).not.toEqual(null);
	// 	});
	//
	// 	it('list.first() === obj', function() {
	// 		expect(list.first().data).toEqual(obj);
	// 	});
	// });
	//
	// describe('list chain works', function() {
	// 	beforeEach(function() {
	// 		list.insert(obj1);
	// 		list.insert(obj2);
	// 		list.insert(obj3);
	// 	});
	//
	// 	it('length === 3', function() {
	// 		expect(list.length).toEqual(3);
	// 	});
	//
	// 	it('this.first().data === obj1', function() {
	// 		expect(list.first().data).toEqual(obj1);
	// 	});
	//
	// 	it('this.first()._prevNode === null', function() {
	// 		expect(list.first()._prevNode).toEqual(null);
	// 	});
	//
	// 	it('this.first()._nextNode.data === obj2', function() {
	// 		expect(list.first()._nextNode.data).toEqual(obj2);
	// 	});
	//
	// 	it('this.last().data === obj3', function() {
	// 		expect(list.last().data).toEqual(obj3);
	// 	});
	// });
	//
	// describe('list removing first element', function() {
	// 	beforeEach(function() {
	// 		list.insert(obj1);
	// 		list.insert(obj2);
	// 		list.remove(obj1);
	// 	});
	//
	// 	it('removing an element decreases length', function() {
	// 		expect(list.length).toEqual(1);
	// 	});
	//
	// 	it('list.last() to be unchanged', function() {
	// 		expect(list.last().data).toEqual(obj2);
	// 	});
	//
	// 	it('list.first() to be updated', function() {
	// 		expect(list.first().data).toEqual(obj2);
	// 	});
	// });
	//
	// describe('list removing last element', function() {
	// 	beforeEach(function() {
	// 		list.insert(obj1);
	// 		list.insert(obj2);
	// 		list.remove(obj2);
	// 	});
	//
	// 	it('removing an element decreases length', function() {
	// 		expect(list.length).toEqual(1);
	// 	});
	//
	// 	it('list.last() to be updated', function() {
	// 		expect(list.last().data).toEqual(obj1);
	// 	});
	//
	// 	it('list.first() to be left unchanged', function() {
	// 		expect(list.first().data).toEqual(obj1);
	// 	});
	// });
	//
	// describe('list.each', function() {
	// 	beforeEach(function() {
	// 		list.insert(obj1);
	// 		list.insert(obj2);
	// 	});
	//
	// 	it('each calls callback for every element', function() {
	// 		var res = [];
	//
	// 		list.each(function(element, pos) {
	// 			var elt = {};
	//
	// 			elt[pos] = element;
	// 			res.push(elt);
	// 		});
	//
	// 		expect(res.length).toEqual(2);
	// 		expect(res).toEqual([
	// 			{0: obj1},
	// 			{1: obj2}
	// 		]);
	// 	});
	// });
	//
	// describe('list.get', function() {
	// 	it('list.get(2) on empty lists returns null', function() {
	// 		expect(list.get(2)).toEqual(null);
	// 	});
	//
	// 	it('list.get(1) returns correct element', function() {
	// 		list.insert(obj1);
	// 		list.insert(obj2);
	// 		expect()
	// 	});
	//
	// 	it('list.get(2) on full list but without position returns null', function() {
	//
	// 	});
	// });
});
