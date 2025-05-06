import { responseWithDataApi } from "@/type";

interface measureBody {
    name:string;
    short_form:string
}

export const ingredientsService = {

  updateMeasure: async (id:number,body:measureBody): Promise<responseWithDataApi> => {
    const res = await fetch(`http://localhost:3333/ingredients/updateMeasure/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: body.name,
        short_form: body.short_form,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const json = await res.json(); 

    return json;
  },

  delMeasure: async (id:number): Promise<responseWithDataApi> => {
    const res = await fetch(`http://localhost:3333/ingredients/delMeasure/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const json = await res.json(); 

    return json;
  },

  getMeasure: async (): Promise<responseWithDataApi> => {
    const res = await fetch("http://localhost:3333/ingredients/measure", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    return json;
  },

  addMeasure:async (body: measureBody): Promise<responseWithDataApi> => {
    const res = await fetch("http://localhost:3333/ingredients/add-measure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.name,
          short_form: body.short_form,
        }),
      });
  
      if (!res.ok) {
        const json = await res.json();
        return json;
      }
  
      const json = await res.json();
  
      return json;
  }
};
