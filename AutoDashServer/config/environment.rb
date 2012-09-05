# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
AutoDashServer::Application.initialize!


class String
  def is_binary_data?
    ( self.count( "^ -~", "^\r\n" ).fdiv(self.size) > 0.3 || self.index( "\x00" ) ) unless empty?
  end
end