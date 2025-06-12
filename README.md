# Approach

## Reusability
For reusability I create core component inside components folder and we can handle the view of the component based on the props that we give

## Fetching data
Since it's using the same data (static) so it will check the session storage first before fetch the data.

## Filter data
Right now I only set to filter the data based on size, allow on road, and suitable for heave waste. Every selected filter will be show at the top of page.

## Mobile view
For mobile view I'm using media query to handle the size of the element and show/hide status.

## Next possible implementation
* we can remove the local session and always fetch the list of items in realtime, and adding the unlimited scroll to fetch the new data based on pagination.
* Adding more filters, and removing applied filters by click the filter pills at the top of the page
* Separate the core component in it's own component library, and integrating it with storybook
