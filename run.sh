#!/bin/bash

file_path=$1
env=$2  
process_file="filtered_data.txt"

# Clear process file
echo "" > $process_file

# Extract relevant data from host file
while read line; do
  line=$(echo "$line" | sed "s/^OPCIT.*ansible_host=//g")
  line=$(echo "$line" | sed "s/ansible_host=.*//g")
  echo "$line" >> $process_file
done < "$file_path"

file_path=$process_file
host_ips=()

# Filter host IPs based on environment
while read line; do
  if [[ $line == *"[${env}]"* ]]; then
    is_storing=true
  fi
  if [[ $is_storing == true ]]; then
    host_ips+=("$line")
  fi
  if [[ $line == "" && ${#host_ips[@]} -ge 1 ]]; then
    is_storing=false
  fi
done < "$file_path"

echo "${host_ips[@]}"


host_ips=("${host_ips[@]:1}") #Removes Group Name 
host_ips=("${host_ips[@]:0:${#host_ips[@]}-1}") # Removes Last blank line.
echo "${host_ips[@]}"


# SSH into host IPs and execute commands
for line in "${host_ips[@]}"; do
  echo "I'm $line"
  #ssh -o StrictHostKeyChecking=no user@${line} "sh -c 'date && hostname'"
  #ssh -o StrictHostKeyChecking=no user@${line} "sh -c 'echo \"ansible\" '"
done


