import Text from '../atoms/Text';
      import FilterButton from '../molecules/FilterButton';
      
      const FilterCarousel = ({ filters, selectedFilter, setSelectedFilter }) => {
        return (
          <div className="space-y-4">
            <Text as="h3" className="text-lg font-semibold text-white text-center">Filters</Text>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4">
              <FilterButton filter={null} selectedFilter={selectedFilter} onClick={setSelectedFilter} />
              {filters?.map((filter) => (
                <FilterButton
                  key={filter.id}
                  filter={filter}
                  selectedFilter={selectedFilter}
                  onClick={setSelectedFilter}
                />
              ))}
            </div>
          </div>
        );
      };
      
      export default FilterCarousel;