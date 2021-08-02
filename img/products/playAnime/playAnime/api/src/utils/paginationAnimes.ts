import cheerio from 'cheerio';

async function paginationAnimes(body: string, numberArray: number) {
  const $ = cheerio.load(body);

  const paginationNumbers: string[] = [];

  $('.pagination').find('a').each(function(i: number, element) {
    paginationNumbers[i] = $(element)[0].attribs.href.split('/')[numberArray];
  });

  return paginationNumbers;
}

export default paginationAnimes;