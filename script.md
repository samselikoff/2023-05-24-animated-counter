# Script

```tsx
<div className="relative w-6">
  {[...Array(10).keys()].map((i) => (
    <span key={i}>{i}</span>
  ))}
</div>
```

```tsx
<div className="relative w-6">
  {[...Array(2).keys()].map((i) => (
    <span className="absolute inset-0 flex justify-center" key={i}>
      {i}
    </span>
  ))}
</div>
```

```tsx
function Number({ number }: { number: number }) {
  return <span className="absolute inset-0 flex justify-center">{number}</span>;
}
```

```tsx
function Number({ number }: { number: number }) {
  return (
    <motion.span
      style={{ y: 24 * number }}
      className="absolute inset-0 flex justify-center"
    >
      {number}
    </motion.span>
  );
}
```

If we go from 0 to 1, everything should animate up. To animate, we need a motion value.

```tsx
let animatedValue = useSpring(value);
useEffect(() => {
  animatedValue.set(value);
}, [animatedValue, value]);
```

Test it out:

```tsx
<motion.div style={{ y: animatedValue }} className="relative w-6">
```

Now can't use `number` and `mv` in render bc ones a motion value and one's react state. for this we need useTransform:

```tsx
let y = useTransform(mv, (latest) => {
  return (number - latest) * 24;
});
```

Reuse. Paramterize to understand

```tsx
let y = useTransform(mv, (latest) => {
  let height = 24;
  let offset = number - latest;

  return offset * height;
});
```

Now shift if > 5

```tsx
let y = useTransform(mv, (latest) => {
  let height = 24;
  let offset = number - latest;
  let memo = offset * height;

  if (offset > 5) {
    memo -= 10 * height;
  }

  return memo;
});
```

How cool is that!

Now we need to wrap it around, so we need some modulu math. Let's get the ones digit of our value.

```tsx
let height = 24;
let placeValue = latest % 10;
let offset = (10 + number - placeValue) % 10;

let memo = offset * height;

if (offset > 5) {
  memo -= 10 * height;
}

return memo;
```

Modulu. 1s digit taken care of!

Let's duplicate, add a `place` prop:

```tsx
<Number place={10} mv={animatedValue} number={i} key={i} />
```

Update placeValue

```tsx
let placeValue = (latest / place) % 10;
```
