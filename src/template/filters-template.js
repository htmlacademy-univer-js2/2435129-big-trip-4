const FILTER_ITEMS = [
  'Everything',
  'Future',
  'Present',
  'Past',
];

function createFilterItems () {
  const container = [];
  for (const filter of FILTER_ITEMS) {
    const item = `<div class="trip-filters__filter">
                    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}"
                    ${filter === 'Everything' ? 'checked' : ''}>
                    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
                  </div>`;
    container.push(item);
  }
  return container.join('');
}
function createFilterElementTemplate() {
  return `<form class="trip-filters" action="#" method="get">
  ${createFilterItems()}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export { createFilterElementTemplate };
