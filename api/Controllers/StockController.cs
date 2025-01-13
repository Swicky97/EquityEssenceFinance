using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/stock")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly IStockRepository _stockRepo;
    public StockController(IStockRepository stockRepo)
    {
        _stockRepo = stockRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var stocks = await _stockRepo.GetAllAsync();

        var stockDTO = stocks.Select(x => x.ToStockDTO());

        return Ok(stocks);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var stock = await _stockRepo.GetByIdAsync(id);

        if (stock == null)
        {
            return NotFound();
        }
        return Ok(stock.ToStockDTO());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStockRequestDTO stockDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var stockModel = stockDTO.ToStockFromCreateDTO();
        await _stockRepo.CreateAsync(stockModel);
        return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDTO());
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDTO updateDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest();
            
        var stockModel = await _stockRepo.UpdateAsync(id, updateDTO);

        if (stockModel == null)
        {
            return NotFound();
        }

        return Ok(stockModel.ToStockDTO());
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id) 
    {
        var stockModel = await _stockRepo.DeleteAsync(id);

        if (stockModel == null)
        {
            return NotFound();
        }

        return NoContent();
    }
}
