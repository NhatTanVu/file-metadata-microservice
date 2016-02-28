# API Basejump: Image Search Abstraction Layer

## User stories

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

## Get image URLs sample
> 1. https://tan-imgsearch.herokuapp.com/api/imagesearch/batman?offset=5
> 2. https://tan-imgsearch.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10

## Get latest search strings sample
> https://tan-imgsearch.herokuapp.com/api/latest/imagesearch

## License

N/A