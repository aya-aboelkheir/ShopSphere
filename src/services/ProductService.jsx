const BASE_URL = "https://dummyjson.com/products";

async function fetchData(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export function getProducts(limit = 30, skip = 0, signal) {
  return fetchData(`${BASE_URL}?limit=${limit}&skip=${skip}`, signal);
}

export function getCategories(signal) {
  return fetchData(`${BASE_URL}/categories`, signal);
}

export async function getCatalogProducts({
  limit = 12,
  skip = 0,
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
  signal,
}) {
  if (search.trim()) {
    const data = await fetchData(`${BASE_URL}?limit=0`, signal);

    let filtered = data.products.filter((product) =>
      product.title.toLowerCase().includes(search.trim().toLocaleLowerCase()),
    );

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (sortBy) {
      filtered.sort((a, b) => {
        const first = a[sortBy];
        const second = b[sortBy];

        if (typeof first === "string") {
          return order === "asc"
            ? first.localeCompare(second)
            : second.localeCompare(first);
        }

        return order === "asc" ? first - second : second - first;
      });
    }
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
    };
  }
  // Normal catalog request when search is empty
  let url = BASE_URL;

  if (category) {
    url += `/category/${encodeURIComponent(category)}`;
  }

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  return fetchData(`${url}?${params}`, signal);
}

export function getProductByID(id ,signal){
  return fetchData(`${BASE_URL}/${id}`,signal)
}


