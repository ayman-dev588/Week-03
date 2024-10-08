d3.json("https://crashviewer.nhtsa.dot.gov/CrashAPI/crashes/GetCrashesByVehicle?make=6&model=41&modelyear=2003&bodyType=4&fromCaseYear=2010&toCaseYear=2015%20&state=21&format=json")
      .then(function(data) {
          data = [data[0], data[1]];

          drawText("#jsonD", data);
       });

       chart = {
        const width = 928;
        const height = 680;
      
        const color = d3.scaleOrdinal(d3.schemeCategory10);
      
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());
      
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");
      
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
      
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group));
      
        node.append("title")
            .text(d => d.id);
      
        node.call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
        
        simulation.on("tick", () => {
          link
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);
      
          node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
        });
      
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
      
        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
      
        invalidation.then(() => simulation.stop());
      
        return svg.node();
      }