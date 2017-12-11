import Dom from '../../js/Util/Dom';

beforeEach(() => {
    document.body.innerHTML = '<div id="myDiv"><span class="mySpan" >athena rulez!</span></div>';
})

test('new Dom()', () => {
    expect(Dom().length).toBe(0);
});

test('new Dom("#invalid")', () => {
    expect(Dom('#foo').length).toBe(0);
});

test('new Dom("body")', () => {
    expect(Dom('body').length).toBe(1);
});

test("new Dom('#myDiv')", () => {
    expect(Dom('#myDiv').length).toBe(1);
});

test("new Dom('.mySpan')", () => {
    expect(Dom('.mySpan').length).toBe(1);
});

test('find("span")', () => {
    var span = Dom('#myDiv').find('span');
    expect(span.length).toBe(1);
});

test('find("spoof")', () => {
    var span = Dom('#myDiv').find('spoof');
    expect(span.length).toBe(0);
});

test('appendTo("body")', () => {
    var p = Dom('p');
    p.appendTo('body');
    expect(Dom('p').length).toBe(1);
});

test('appendTo(Dom(document.body))', () => {
    var p = Dom('p');
    p.appendTo(document.body);
    expect(Dom('p').length).toBe(1);
});

test('appendTo() returns this', () => {
    var p = Dom('p');
    var p2 = p.appendTo(document.body);
    expect(p).toBe(p2);
});

test('Dom("#spoof").attr()', () => {
    Dom('#spooth').attr('data-athena', 'rulez');
});

test('Dom("#myDiv").attr("data-athena", "rulez")', () => {
    var div = Dom('#myDiv');
    var div2 = div.attr('data-athena', 'rulez');

    expect(div[0].getAttribute('data-athena')).toBe('rulez');
    expect(div).toBe(div2);
});

test('Dom("#myDiv").attr({"data-athena": "rulez", "sprite": "rulez"})', () => {
    var div = Dom('#myDiv');
    var div2 = div.attr({ "data-athena": "rulez", "data-sprite": "rulez" });

    expect(div[0].getAttribute('data-athena')).toBe('rulez');
    expect(div[0].getAttribute('data-sprite')).toBe('rulez');
});

test('Dom("#spoof").addClass()', () => {
    Dom('#spooth').addClass('athena');
});

test('Dom("#myDiv").addClass()', () => {
    var div = Dom('#myDiv'),
        div2 = div.addClass('athena');
    expect(document.getElementById('myDiv').classList.contains('athena')).toBe(true);
    expect(div).toBe(div2);
});

test('Dom("#spoof").html("athena")', () => {
    Dom('#spoof').html('athena');
});

test('Dom("#myDiv").html("athena")', () => {
    var div = Dom('#myDiv'),
        div2 = div.html('athena');
    expect(document.getElementById('myDiv').innerHTML).toBe('athena');
    expect(div).toBe(div2);
});