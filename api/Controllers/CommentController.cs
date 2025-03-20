using api.Dtos.Comment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers;

[Route("api/Comment")]
[ApiController]
[Authorize]
public class CommentController : ControllerBase
{
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;
    private readonly IFMPService _fmpService;

    public CommentController(
        ICommentRepository commentRepo, 
        IStockRepository stockRepo, 
        IFMPService fmpService
    )
    {
        _commentRepo = commentRepo;
        _stockRepo = stockRepo;
        _fmpService = fmpService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
    {
        var comments = await _commentRepo.GetAllAsync(queryObject);
        var commentDTOs = comments.Select(x => x.ToCommentDTO());
        return Ok(commentDTOs);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var comment = await _commentRepo.GetByIdAsync(id);
        if (comment == null) return NotFound();
        return Ok(comment.ToCommentDTO());
    }

    [HttpPost("{symbol:alpha}")]
    public async Task<IActionResult> Create([FromRoute] string symbol, CreateCommentDTO commentDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var stock = await _stockRepo.GetBySymbolAsync(symbol);
        if (stock == null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);
            if (stock == null) return BadRequest("Stock does not exist");

            await _stockRepo.CreateAsync(stock);
        }

        // 🔹 Extract user ID from JWT token (Auth0 `sub` claim)
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User ID not found in token.");

        var commentModel = commentDTO.ToCommentFromCreate(stock.Id);
        commentModel.AppUserId = userId; // Store Auth0 User ID
        await _commentRepo.CreateAsync(commentModel);

        return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDTO());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDTO updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
        if (comment == null) return NotFound("Comment not found");

        return Ok(comment.ToCommentDTO());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var commentModel = await _commentRepo.DeleteAsync(id);
        if (commentModel == null) return NotFound("Comment does not exist");

        return Ok(commentModel);
    }
}
