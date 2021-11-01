const CONFIG = {
    titleWeb: "Gửi Tuyết",
    introTitle: 'Tuyết 11a3 ấy nha',
    introDesc: `Trái đất vốn lạ thường
    Mà sao em cứ đi nhầm đường
    Lạc vào tim anh lẻ loi
    Đằng sau chữ yêu đây là thương`,
    btnIntro: '^^HiHi^^',
    title: 'Phải chăng Duy đã yêu Tuyết ngay từ cái nhìn đầu tiên 🥰',
    desc: 'Phải chăng Duy đã say ngay từ lúc thấy nụ cười ấy ',
    btnYes: 'Thích Duy lắm <33',
    btnNo: 'Không nha :3',
    question: 'Trên thế giới hơn 7 tỉ người mà sao Duy lại yêu Tuyết nhỉ <3',
    btnReply: 'Gửi cho bạn <3',
    reply: 'Yêu thì Duy yêu mà không yêu thì yêu <33333333',
    mess: 'Mình biết mà 🥰. Yêu bạn nhiều nhiều 😘😘',
    messDesc: 'Nhớ ăn nhiều vào để đừng thành cục sương nha',
    btnAccept: 'Okiiiii lun <3',
    title: 'Thế bây giờ chơi 1 trò chơi với duy nhá, nếu thua thì cho duy xin cái ảnh ấy nha!!',
    btnYes: 'Oki lun <3' ,
    btnNo: 'Ko chơi j hết nha' ,
}
class TicTacTo
  attr_reader :board
  WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
    
  def initialize(board = nil, options = {})
    @options = {rows: 3, cols: 3, chr_empty: ' ', chr_separ_v: '|', chr_separ_h: '-', players: {'Player 1': 'X', 'Player 2': 'O'}}
    @options = @options.merge(options)
    @board = board || Array.new(self.cells_count, @options[:chr_empty])
  end
  
  def cells_count
    @options[:rows]*@options[:cols]
  end

  def get_cell_from_row_col(row, col)
    # puts "row: #{row}, col: #{col}, cell: #{((row-1)*@options[:cols])+col-1}"
    @board[((row-1)*@options[:cols])+col-1]
  end

  def display_board
    @options[:rows].times.with_index(1) do |r, row_index|
      str_row = ''
      @options[:cols].times.with_index(1) do |c, col_index|
        str_row += @options[:chr_empty]+get_cell_from_row_col(row_index, col_index)+@options[:chr_empty]
        str_row += @options[:chr_separ_v] if col_index < @options[:cols]
      end
      puts str_row
      puts @options[:chr_separ_h]*((@options[:cols]*3)+@options[:cols]-1) if row_index < @options[:rows]
    end
  end

  def input_to_index(str_input)
    str_input.to_i-1
  end

  def move(index, player_token)
    @board[index] = player_token
  end

  def position_taken?(index)
    !@board[index].strip.empty?
  end

  def valid_move?(index)
    index.between?(0, cells_count-1) && !position_taken?(index)
  end

  def turn
    puts "Enter position (1-9):"
    index = input_to_index(gets.strip)
    if valid_move?(index)
      move(index, current_player)
      display_board
    else
      turn
    end
  end

  def turn_count
    counter = 0
    @board.each {|cell| counter += 1 unless cell.strip.empty?}
    counter
  end

  def current_player
    turn_count % 2 == 0 ? 'X' : 'O'
  end

  def won?
    ret = nil
    WIN_COMBINATIONS.each do |wc|
      if wc.all? { |index| position_taken?(index) && @board[index] == @board[wc[0]]}
        ret = wc
        break
      end
    end
    ret
  end

  def full?
    turn_count == cells_count
  end

  def draw?
    full? && !won?
  end

  def over?
    won? || full?
  end

  def winner
    won = won?
    won ? @board[won[0]] : nil
  end

  def play
    until over? do
      turn
    end
    if won?
      puts "Congratulations #{winner}!"
    else
      puts "Cat's Game!"
    end
  end
end
}
 messLink: 'https://github.com/duy11a14/Confess-Crush'

